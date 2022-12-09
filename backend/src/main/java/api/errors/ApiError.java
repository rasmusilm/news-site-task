package api.errors;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ApiError {
    private List<SimpleExeption> errors = new ArrayList<>();

    public void addError(SimpleExeption ex) {
        errors.add(ex);
    }
}
