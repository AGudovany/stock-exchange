package com.stock_exchange.stock_exchange.market.services;

import com.stock_exchange.stock_exchange.market.models.Stock;
import com.stock_exchange.stock_exchange.market.models.StockExchange;
import com.stock_exchange.stock_exchange.market.repositories.StockExchangeRepository;
import com.stock_exchange.stock_exchange.market.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockExchangeService {

    @Autowired
    private StockExchangeRepository stockExchangeRepository;
    @Autowired
    private StockRepository stockRepository;

    public StockExchange createStockExchange(StockExchange stockExchange) {
        return stockExchangeRepository.save(stockExchange);
    }

    public StockExchange getStockExchange(Long id) {
        return stockExchangeRepository.findById(id).orElseThrow(() -> new RuntimeException("Stock Exchange not found"));
    }

    public List<Stock> getStocksInExchange(Long id) {
        StockExchange stockExchange = stockExchangeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock Exchange not found"));
        return stockExchange.getStocks().stream().toList();
    }

    public List<StockExchange> getAllStockExchanges() {
        return stockExchangeRepository.findAll();
    }

    public StockExchange addStockToExchange( Long exchangeId, Long stockId ) {
        StockExchange stockExchange = stockExchangeRepository.findById(exchangeId)
                .orElseThrow(() -> new RuntimeException("Stock Exchange not found"));

        Stock existingStock = stockRepository.findById(stockId)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        stockExchange.getStocks().add(existingStock);
        updateLiveStatus(stockExchange);

        return stockExchangeRepository.save(stockExchange);
    }

    private void updateLiveStatus(StockExchange stockExchange) {
        stockExchange.setLiveInMarket(stockExchange.getStocks().size() >= 5);
    }
}
