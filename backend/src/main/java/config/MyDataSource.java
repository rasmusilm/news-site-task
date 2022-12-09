package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import javax.sql.DataSource;

@Configuration
public class MyDataSource {

    @Bean
    public DataSource dataSource(Environment env) {
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName("org.hsqldb.jdbcDriver");
        ds.setUrl(env.getProperty("hsql.url"));

//        var populator = new ResourceDatabasePopulator(
//                new ClassPathResource("schema.sql"),
//                new ClassPathResource("seed.sql"));
//
//        DatabasePopulatorUtils.execute(populator, ds);

        return ds;
    }

    @Bean("dialect")
    public String dialect() {
        return "org.hibernate.dialect.HSQLDialect";
    }
}