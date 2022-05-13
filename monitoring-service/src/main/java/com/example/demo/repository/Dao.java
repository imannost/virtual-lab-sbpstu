package com.example.demo.repository;

import com.example.demo.Metric;
import java.util.Collection;
import java.util.Optional;

public interface Dao<T, I>  {
    Optional<T> get(Metric id);
    Collection<T> getAll();
    void save(T t);
    void update(T t, int count);
    void delete(T t);
}
