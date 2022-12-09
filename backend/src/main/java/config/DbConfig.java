package config;

import jakarta.persistence.EntityManagerFactory;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.DatabasePopulatorUtils;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
public class DbConfig {

    @Bean
    public EntityManagerFactory entityManagerFactory(
            DataSource dataSource,
            @Qualifier("dialect") String  dialect) {

        var populator = new ResourceDatabasePopulator(
                new ClassPathResource("schema.sql")
        );

        DatabasePopulatorUtils.execute(populator, dataSource);

        LocalContainerEntityManagerFactoryBean factory =
                new LocalContainerEntityManagerFactoryBean();
        factory.setPersistenceProviderClass(
                HibernatePersistenceProvider.class);
        factory.setPackagesToScan("models");
        factory.setDataSource(dataSource);
        factory.setJpaProperties(additionalProperties(dialect));
        factory.afterPropertiesSet();

        var seeder = new ResourceDatabasePopulator(
                new ClassPathResource("seed.sql")
        );

        DatabasePopulatorUtils.execute(seeder, dataSource);

        return factory.getObject();
    }

    @Bean
    public PlatformTransactionManager transactionManager(
            EntityManagerFactory entityManagerFactory) {

        return new JpaTransactionManager(entityManagerFactory);
    }

    private Properties additionalProperties(String dialect) {
        Properties properties = new Properties();
//        properties.setProperty("hibernate.hbm2ddl.auto", "validate");
        properties.setProperty("hibernate.hbm2ddl.auto", "create");
        properties.setProperty("hibernate.dialect", dialect);
        properties.setProperty("hibernate.show_sql", "false");
        properties.setProperty("hibernate.format_sql", "true");

        return properties;
    }
}
