package com.stock_exchange.stock_exchange.market.models;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private BigDecimal currentPrice;
    private LocalDateTime lastUpdate;

    public Stock() {}

    public Stock(Long id, String name, String description, BigDecimal currentPrice, LocalDateTime lastUpdate) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.currentPrice = currentPrice;
        this.lastUpdate = lastUpdate;
    }

    @ManyToMany
    private Set<StockExchange> stockExchanges;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(BigDecimal currentPrice) {
        this.currentPrice = currentPrice;
    }

    public LocalDateTime getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(LocalDateTime lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public Set<StockExchange> getStockExchanges() {
        return stockExchanges;
    }

    public void setStockExchanges(Set<StockExchange> stockExchanges) {
        this.stockExchanges = stockExchanges;
    }
}
