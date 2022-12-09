package api;

import api.errors.ApiError;
import api.errors.SimpleExeption;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.Objects;
import java.util.stream.Stream;

@RestControllerAdvice
public class ControllerErrorHandler {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleValidationErrors(MethodArgumentNotValidException exception) {
        List<FieldError> errors = exception.getBindingResult().getFieldErrors();

        var response = new ApiError();

        for (FieldError err: errors) {
            List<String> args = Stream.of(Objects.requireNonNull(err.getArguments()))
                    .filter(arg -> !(arg instanceof DefaultMessageSourceResolvable))
                    .map(String::valueOf).toList();

            response.addError(new SimpleExeption(err.getCodes()[0] + formatValidationArguments(args)));
        }

        return response;
    }

    private String formatValidationArguments(List<String> args) {
        if (args.isEmpty()) {
            return "";
        }
        else if (args.size() == 1) {
            return "{" + args.get(0) +"}";
        }
        else {

            StringBuilder res = new StringBuilder("{");

            for (int i = 0; i < args.size(); i++) {
                res.append(" ").append(args.get(i));
                if (i+1 != args.size()) {
                    res.append(",");
                }
            }

            res.append("}");
            return res.toString();
        }

    }
}
