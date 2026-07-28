package dev.faruk.blog.mcpserver;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "order-api")
public record OrderApiProperties(String baseUrl) {
}
