package com.stock_exchange.stock_exchange.market.controllers;

import com.stock_exchange.stock_exchange.market.models.Stock;
import com.stock_exchange.stock_exchange.market.services.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/stocks")
public class StockController {

    @Autowired
    private StockService stockService;

    @PostMapping
    public Stock addStock(@RequestBody Stock stock) {
        return stockService.addStock(stock);
    }

    @GetMapping("/{id}")
    public Stock getStock(@PathVariable Long id) {
        return stockService.getStockById(id);
    }

    @GetMapping()
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }

}

