package com.example.demo.service;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ESP32PortService {

    @Bean
    public WebServerFactoryCustomizer<TomcatServletWebServerFactory> multiPortCustomizer(){
        return factory -> {
            Connector connector8081 = new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
            connector8081.setPort(8081);
            factory.addAdditionalTomcatConnectors(connector8081);

            Connector connector8082 = new Connector(TomcatServletWebServerFactory.DEFAULT_PROTOCOL);
            connector8082.setPort(8082);
            factory.addAdditionalTomcatConnectors(connector8082);
        };
    }
}
