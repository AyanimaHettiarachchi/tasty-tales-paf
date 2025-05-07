package backend.Admin.category.repository;

import backend.Admin.category.categoryModel.CategoryModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<CategoryModel, String> {

}
