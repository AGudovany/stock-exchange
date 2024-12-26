package com.stock_exchange.stock_exchange.market.repositories;

import com.stock_exchange.stock_exchange.market.models.StockExchange;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockExchangeRepository extends JpaRepository<StockExchange, Long> {
}
