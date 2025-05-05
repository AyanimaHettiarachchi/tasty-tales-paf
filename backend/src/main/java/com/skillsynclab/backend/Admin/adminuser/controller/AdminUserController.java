package backend.Admin.adminuser.controller;

import backend.Achievements.repository.AchievementsRepository;
import backend.LearningPlan.model.LearningPlanModel;
import backend.LearningPlan.repository.LearningPlanRepository;
import backend.Notification.model.NotificationModel;
import backend.Notification.repository.NotificationRepository;
import backend.PostManagement.repository.PostManagementRepository;
import backend.Admin.adminuser.model.AdminUserModel;
import backend.Admin.adminuser.repository.AdminUserRepository;
import backend.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/admin")
public class AdminUserController {
    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private AchievementsRepository achievementsRepository; // Inject the repository

    @Autowired
    private LearningPlanRepository learningPlanRepository; // Inject the repository

    @Autowired
    private PostManagementRepository postManagementRepository; // Inject the repository

    @Autowired
    private JavaMailSender mailSender; // Add JavaMailSender for sending emails

    private static final String PROFILE_UPLOAD_DIR = "uploads/profile"; // Relative path

    //Insert
    @PostMapping("/user")
    public ResponseEntity<?> newUserModel(@RequestBody AdminUserModel newAdminUserModel) {
        System.out.println("Creating new user: " + newAdminUserModel.getEmail()); // Log email for debugging
        if (newAdminUserModel.getEmail() == null || newAdminUserModel.getFullname() == null ||
            newAdminUserModel.getPassword() == null) { // Validate skills
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Missing required fields."));
        }

        if (adminUserRepository.existsByEmail(newAdminUserModel.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Email already exists!"));
        }

        try {
            AdminUserModel savedUser = adminUserRepository.save(newAdminUserModel);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Failed to save user."));
        }
    }

    //User Login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AdminUserModel loginDetails) {
        System.out.println("Login attempt for email: " + loginDetails.getEmail()); // Log email for debugging

        AdminUserModel user = adminUserRepository.findByEmail(loginDetails.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("Email not found: " + loginDetails.getEmail()));

        if (user.getPassword().equals(loginDetails.getPassword())) {
            System.out.println("Login successful for email: " + loginDetails.getEmail()); // Log success
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login Successful");
            response.put("id", user.getId());
            response.put("fullName", user.getFullname());
            return ResponseEntity.ok(response);
        } else {
            System.out.println("Invalid password for email: " + loginDetails.getEmail()); // Log invalid password
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid credentials!"));
        }
    }

    //Display
    @GetMapping("/user")
    List<AdminUserModel> getAllUsers() {
        return adminUserRepository.findAll();
    }

    @GetMapping("/user/{id}")
    AdminUserModel getUserId(@PathVariable String id) {
        return adminUserRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
    }

    //update
    @PutMapping("/user/{id}")
    AdminUserModel updateProfile(@RequestBody AdminUserModel newAdminUserModel, @PathVariable String id) {
        return adminUserRepository.findById(id)
                .map(adminUserModel -> {
                    adminUserModel.setFullname(newAdminUserModel.getFullname());
                    adminUserModel.setEmail(newAdminUserModel.getEmail());
                    adminUserModel.setPassword(newAdminUserModel.getPassword());
                    
                    // Update postOwnerName in all related posts
                    List<LearningPlanModel> userPosts = learningPlanRepository.findByPostOwnerID(id);
                    userPosts.forEach(post -> {
                        post.setPostOwnerName(newAdminUserModel.getFullname());
                        learningPlanRepository.save(post);
                    });
                    
                    return adminUserRepository.save(adminUserModel);
                }).orElseThrow(() -> new ResourceNotFoundException(id));
    }


    //delete
    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteProfile(@PathVariable String id) {
        if (!adminUserRepository.existsById(id)) {
            throw new ResourceNotFoundException(id);
        }

        // Delete user-related data
        adminUserRepository.findById(id).ifPresent(user -> {
            // Delete user's posts
            achievementsRepository.deleteByPostOwnerID(id);
            learningPlanRepository.deleteByPostOwnerID(id);
            postManagementRepository.deleteByUserID(id); // Delete user's posts
            notificationRepository.deleteByUserId(id);

        });

        // Delete the user account
        adminUserRepository.deleteById(id);

        return ResponseEntity.ok(Map.of("message", "User account and related data deleted successfully."));
    }

    // check email
    @GetMapping("/checkEmail")
    public boolean checkEmailExists(@RequestParam String email) {
        return adminUserRepository.existsByEmail(email);
    }





    @PostMapping("/sendVerificationCode")
    public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        if (email == null || code == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Email and code are required."));
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Your Verification Code");
            message.setText("Your verification code is: " + code);
            mailSender.send(message);

            return ResponseEntity.ok(Map.of("message", "Verification code sent successfully."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Failed to send verification code."));
        }
    }
}
