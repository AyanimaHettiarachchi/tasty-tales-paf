package backend.Admin.category.categoryModel;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "category")
public class CategoryModel {
    @Id
    @GeneratedValue
    private String id;
    private String name;

    public CategoryModel() {}

    public CategoryModel(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}