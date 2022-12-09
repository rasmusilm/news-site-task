package models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name="users")
public class User {
    @Id
    private String username;

    @NonNull
    private String password;
    @NonNull
    @Column(name = "first_name")
    private String firstname;

    private boolean enabled;
}
