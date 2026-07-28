# Adapting Spring Boot REST to MCP

Runnable example for the blog article **Adapting an Existing Spring Boot REST API to MCP**.

## Prerequisites

- Java 17+ (Spring Boot 3.4 requires it — check with `java -version`)
- Maven 3.9+

If your machine defaults to Java 8, set `JAVA_HOME` before building or use the full path to the Java 17 binary.

If Maven fails against a corporate mirror, use the bundled settings:

```bash
mvn -s .mvn/settings.xml clean package
```

## Modules

| Module | Port | Role |
|--------|------|------|
| `order-api` | 8080 | Existing Spring Boot REST API (unchanged business layer) |
| `mcp-server` | 8081 | Spring AI MCP adapter that calls the REST API via HTTP |

## Stack (mcp-server module)

- **Spring Boot 3.4** — adapter application
- **Spring AI MCP Server WebMVC** — exposes MCP tools over HTTP/SSE
- **`@Tool` annotations** — Spring AI 1.0 style; the starter publishes them as MCP tools
- **`RestClient`** — calls the unchanged REST API

On newer Spring AI versions, prefer `@McpTool` / `@McpToolParam` instead of `@Tool` / `@ToolParam`.

## Build everything

```bash
mvn clean package
```

## Run

**Terminal 1 — REST API**

```bash
cd order-api
mvn spring-boot:run
```

**Terminal 2 — MCP adapter**

```bash
cd mcp-server
mvn spring-boot:run
```

## Verify the REST API

```bash
curl -X POST http://localhost:8080/orders \
  -H "Content-Type: application/json" \
  -d '{"customerId":15,"productId":83,"quantity":5}'

curl http://localhost:8080/orders/1001
```

Expected: JSON order with `"status":"CREATED"`.

## Connect an MCP client

The MCP server uses Spring AI 1.0 with WebMVC transport (SSE).

Point your MCP client (Claude Desktop, Cursor, MCP Inspector) at the server running on port **8081**.
See the [Spring AI MCP documentation](https://docs.spring.io/spring-ai/reference/api/mcp/mcp-server-boot-starter-docs.html) for transport details.

Tools exposed to the model:

- `create_order(customerId, productId, quantity)` → `POST /orders`
- `find_order(orderId)` → `GET /orders/{id}`

The REST API code is **not modified** — the MCP server is a separate process that translates tool calls into HTTP requests.
