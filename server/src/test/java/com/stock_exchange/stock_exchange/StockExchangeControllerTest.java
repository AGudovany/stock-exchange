package com.stock_exchange.stock_exchange;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stock_exchange.stock_exchange.market.models.Stock;
import com.stock_exchange.stock_exchange.market.models.StockExchange;
import com.stock_exchange.stock_exchange.market.services.StockExchangeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class StockExchangeControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	@MockBean
	private StockExchangeService stockExchangeService;

	@Test
	void testGetAllStockExchanges() throws Exception {
		StockExchange exchange1 = new StockExchange();
		exchange1.setId(1L);
		exchange1.setName("NYSE");
		exchange1.setDescription("New York Stock Exchange");

		StockExchange exchange2 = new StockExchange();
		exchange2.setId(2L);
		exchange2.setName("NASDAQ");
		exchange2.setDescription("NASDAQ Stock Exchange");

		List<StockExchange> exchanges = Arrays.asList(exchange1, exchange2);

		when(stockExchangeService.getAllStockExchanges()).thenReturn(exchanges);

		mockMvc.perform(get("/api/v1/exchanges"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$[0].name").value("NYSE"))
				.andExpect(jsonPath("$[1].name").value("NASDAQ"));
	}

	@Test
	void testCreateStockExchange() throws Exception {
		StockExchange stockExchange = new StockExchange();
		stockExchange.setId(1L);
		stockExchange.setName("NYSE");
		stockExchange.setDescription("New York Stock Exchange");

		when(stockExchangeService.createStockExchange(any(StockExchange.class))).thenReturn(stockExchange);

		mockMvc.perform(post("/api/v1/exchanges")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(stockExchange)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("NYSE"))
				.andExpect(jsonPath("$.description").value("New York Stock Exchange"));
	}

	@Test
	void testGetStocksInExchange() throws Exception {
		Stock stock1 = new Stock();
		stock1.setId(1L);
		stock1.setName("Apple");

		Stock stock2 = new Stock();
		stock2.setId(2L);
		stock2.setName("Microsoft");

		when(stockExchangeService.getStocksInExchange(1L)).thenReturn(Arrays.asList(stock1, stock2));

		mockMvc.perform(get("/api/v1/exchanges/1/stocks"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(2)))
				.andExpect(jsonPath("$[0].name").value("Apple"))
				.andExpect(jsonPath("$[1].name").value("Microsoft"));
	}

	@Test
	void testAddStockToExchange() throws Exception {
		StockExchange stockExchange = new StockExchange();
		stockExchange.setId(1L);
		stockExchange.setName("NYSE");
		stockExchange.setDescription("New York Stock Exchange");

		when(stockExchangeService.addStockToExchange(1L, 1L)).thenReturn(stockExchange);

		Stock stock = new Stock();
		stock.setId(1L);

		mockMvc.perform(post("/api/v1/exchanges/1/stocks")
						.contentType(MediaType.APPLICATION_JSON)
						.content(objectMapper.writeValueAsString(stock)))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("NYSE"));
	}

	@Test
	void testGetStockExchangeById() throws Exception {
		StockExchange stockExchange = new StockExchange();
		stockExchange.setId(1L);
		stockExchange.setName("NYSE");
		stockExchange.setDescription("New York Stock Exchange");

		when(stockExchangeService.getStockExchange(1L)).thenReturn(stockExchange);

		mockMvc.perform(get("/api/v1/exchanges/1"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.name").value("NYSE"))
				.andExpect(jsonPath("$.description").value("New York Stock Exchange"));
	}
}