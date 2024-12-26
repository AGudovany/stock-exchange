package com.stock_exchange.stock_exchange.market.repositories;

import com.stock_exchange.stock_exchange.market.models.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
}
