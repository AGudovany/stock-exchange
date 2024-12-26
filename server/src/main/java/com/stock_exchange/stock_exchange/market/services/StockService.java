package com.stock_exchange.stock_exchange.market.services;

import com.stock_exchange.stock_exchange.market.models.Stock;
import com.stock_exchange.stock_exchange.market.repositories.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StockService {

    @Autowired
    private StockRepository stockRepository;

    public Stock addStock(Stock stock) {
        stock.setLastUpdate(LocalDateTime.now());
        return stockRepository.save(stock);
    }

    public Stock getStockById(Long id) {
        return stockRepository.findById(id).orElseThrow(() -> new RuntimeException("Stock not found"));
    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }
}
