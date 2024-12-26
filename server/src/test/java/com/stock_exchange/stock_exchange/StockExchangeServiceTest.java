package com.stock_exchange.stock_exchange;

import com.stock_exchange.stock_exchange.market.models.Stock;
import com.stock_exchange.stock_exchange.market.models.StockExchange;
import com.stock_exchange.stock_exchange.market.repositories.StockExchangeRepository;
import com.stock_exchange.stock_exchange.market.repositories.StockRepository;
import com.stock_exchange.stock_exchange.market.services.StockExchangeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class StockExchangeServiceTest {

	@Mock
	private StockExchangeRepository stockExchangeRepository;

	@Mock
	private StockRepository stockRepository;

	@InjectMocks
	private StockExchangeService stockExchangeService;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

	@Test
	void testCreateStockExchange() {
		StockExchange stockExchange = new StockExchange();
		stockExchange.setId(1L);
		stockExchange.setName("NYSE");
		stockExchange.setDescription("New York Stock Exchange");

		when(stockExchangeRepository.save(stockExchange)).thenReturn(stockExchange);

		StockExchange createdExchange = stockExchangeService.createStockExchange(stockExchange);

		assertNotNull(createdExchange);
		assertEquals("NYSE", createdExchange.getName());
		verify(stockExchangeRepository, times(1)).save(stockExchange);
	}

	@Test
	void testGetStockExchange() {
		StockExchange stockExchange = new StockExchange();
		stockExchange.setId(1L);
		stockExchange.setName("NYSE");

		when(stockExchangeRepository.findById(1L)).thenReturn(Optional.of(stockExchange));

		StockExchange foundExchange = stockExchangeService.getStockExchange(1L);

		assertNotNull(foundExchange);
		assertEquals("NYSE", foundExchange.getName());
		verify(stockExchangeRepository, times(1)).findById(1L);
	}

	@Test
	void testGetStockExchangeNotFound() {
		when(stockExchangeRepository.findById(1L)).thenReturn(Optional.empty());

		RuntimeException exception = assertThrows(RuntimeException.class, () -> stockExchangeService.getStockExchange(1L));

		assertEquals("Stock Exchange not found", exception.getMessage());
		verify(stockExchangeRepository, times(1)).findById(1L);
	}

	@Test
	void testGetStocksInExchange() {
		StockExchange stockExchange = new StockExchange();
		stockExchange.setId(1L);

		Stock stock1 = new Stock();
		stock1.setId(1L);
		stock1.setName("Apple");

		Stock stock2 = new Stock();
		stock2.setId(2L);
		stock2.setName("Microsoft");

		stockExchange.setStocks(new HashSet<>(Arrays.asList(stock1, stock2)));

		when(stockExchangeRepository.findById(1L)).thenReturn(Optional.of(stockExchange));

		List<Stock> stocks = stockExchangeService.getStocksInExchange(1L);

		assertEquals(2, stocks.size());
		assertTrue(stocks.stream().anyMatch(stock -> stock.getName().equals("Apple")));
		assertTrue(stocks.stream().anyMatch(stock -> stock.getName().equals("Microsoft")));
		verify(stockExchangeRepository, times(1)).findById(1L);
	}

	@Test
	void testAddStockToExchange() {
		StockExchange stockExchange = new StockExchange();
		stockExchange.setId(1L);
		stockExchange.setName("NYSE");
		stockExchange.setStocks(new HashSet<>());

		Stock stock = new Stock();
		stock.setId(1L);
		stock.setName("Apple");

		when(stockExchangeRepository.findById(1L)).thenReturn(Optional.of(stockExchange));
		when(stockRepository.findById(1L)).thenReturn(Optional.of(stock));
		when(stockExchangeRepository.save(any(StockExchange.class))).thenReturn(stockExchange);

		StockExchange updatedExchange = stockExchangeService.addStockToExchange(1L, 1L);

		assertNotNull(updatedExchange);
		assertEquals(1, updatedExchange.getStocks().size());
		verify(stockExchangeRepository, times(1)).findById(1L);
		verify(stockRepository, times(1)).findById(1L);
		verify(stockExchangeRepository, times(1)).save(stockExchange);
	}

	@Test
	void testAddStockToExchangeNotFound() {
		when(stockExchangeRepository.findById(1L)).thenReturn(Optional.empty());

		RuntimeException exception = assertThrows(RuntimeException.class, () -> stockExchangeService.addStockToExchange(1L, 1L));

		assertEquals("Stock Exchange not found", exception.getMessage());
		verify(stockExchangeRepository, times(1)).findById(1L);
		verify(stockRepository, never()).findById(anyLong());
	}

	@Test
	void testGetAllStockExchanges() {
		StockExchange exchange1 = new StockExchange();
		exchange1.setId(1L);
		exchange1.setName("NYSE");

		StockExchange exchange2 = new StockExchange();
		exchange2.setId(2L);
		exchange2.setName("NASDAQ");

		when(stockExchangeRepository.findAll()).thenReturn(Arrays.asList(exchange1, exchange2));

		List<StockExchange> exchanges = stockExchangeService.getAllStockExchanges();

		assertEquals(2, exchanges.size());
		assertTrue(exchanges.stream().anyMatch(exchange -> exchange.getName().equals("NYSE")));
		assertTrue(exchanges.stream().anyMatch(exchange -> exchange.getName().equals("NASDAQ")));
		verify(stockExchangeRepository, times(1)).findAll();
	}
}