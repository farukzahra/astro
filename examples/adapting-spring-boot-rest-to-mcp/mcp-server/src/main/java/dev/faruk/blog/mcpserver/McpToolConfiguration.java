package dev.faruk.blog.mcpserver;

import org.springframework.ai.tool.ToolCallbackProvider;
import org.springframework.ai.tool.method.MethodToolCallbackProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class McpToolConfiguration {

    @Bean
    ToolCallbackProvider orderToolCallbackProvider(OrderMcpTools orderMcpTools) {
        return MethodToolCallbackProvider.builder()
                .toolObjects(orderMcpTools)
                .build();
    }
}
