package com.stock_exchange.stock_exchange.market.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class StockExchange {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private boolean liveInMarket = false;

    public StockExchange() {}

    public StockExchange(Long id, String name, String description, boolean liveInMarket) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.liveInMarket = liveInMarket;
    }

    @ManyToMany
    @JoinTable(
            name = "exchange_to_stock",
            joinColumns = @JoinColumn(name = "stock_exchange_id"),
            inverseJoinColumns = @JoinColumn(name = "stock_id")
    )

    private Set<Stock> stocks;

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

    public boolean isLiveInMarket() {
        return liveInMarket;
    }

    public void setLiveInMarket(boolean liveInMarket) {
        this.liveInMarket = liveInMarket;
    }

    public Set<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(Set<Stock> stocks) {
        this.stocks = stocks;
    }
}
