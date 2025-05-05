package backend.Admin.category.categoryController;

import backend.Admin.category.categoryModel.CategoryModel;
import backend.Admin.category.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin("http://localhost:3000")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping()
    public List<CategoryModel> getCategories() {
        return categoryRepository.findAll();
    }

   @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody CategoryModel category, @PathVariable String id) {
        return categoryRepository.findById(id).map(existingCategory -> {
            existingCategory.setName(category.getName()); // Update fields as needed
            categoryRepository.save(existingCategory); // Save the updated category
            return ResponseEntity.ok("Category updated successfully");
        }).orElse(ResponseEntity.notFound().build());
    }
  @PostMapping()
  public CategoryModel save(@RequestBody CategoryModel category) {
     return categoryRepository.save(category);
  }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable String id) {
        System.out.println("Deleting category with ID: " + id);
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id); // Use deleteById to delete by ID
            return ResponseEntity.ok("Category deleted");
        }
        return ResponseEntity.notFound().build();
    }
}
