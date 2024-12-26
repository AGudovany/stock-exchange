package com.stock_exchange.stock_exchange.market.controllers;

import com.stock_exchange.stock_exchange.market.models.Stock;
import com.stock_exchange.stock_exchange.market.models.StockExchange;
import com.stock_exchange.stock_exchange.market.services.StockExchangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/exchanges")
public class StockExchangeController {

    @Autowired
    private StockExchangeService stockExchangeService;

    @PostMapping
    public StockExchange createStockExchange(@RequestBody StockExchange stockExchange) {
        return stockExchangeService.createStockExchange(stockExchange);
    }

    @PostMapping("/{exchangeId}/stocks")
    public StockExchange addStockToExchange(@PathVariable Long exchangeId, @RequestBody Stock stock) {
        return stockExchangeService.addStockToExchange(exchangeId, stock.getId());
    }

    @GetMapping("/{id}")
    public StockExchange getStockExchange(@PathVariable Long id) {
        return stockExchangeService.getStockExchange(id);
    }

    @GetMapping("/{exchangeId}/stocks")
    public List<Stock> getStocksInExchange(@PathVariable Long exchangeId) {
        return stockExchangeService.getStocksInExchange(exchangeId);
    }

    @GetMapping()
    public List<StockExchange> getAllStocks() {
        return stockExchangeService.getAllStockExchanges();
    }

}
