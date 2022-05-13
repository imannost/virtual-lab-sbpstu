package com.example.demo.repository;

import com.example.demo.Metric;

import java.sql.*;
import java.util.Collection;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PostgreSqlDao implements Dao<Metric, Integer>{

    private static final Logger LOGGER =
            Logger.getLogger(PostgreSqlDao.class.getName());

    private final Optional<Connection> connection;

    public PostgreSqlDao() {
        this.connection = JdbcConnection.getConnection();
    }

    @Override
    public Optional<Metric> get(Metric id) {
        return connection.flatMap(conn -> {
            Optional<Metric> metric = Optional.empty();
            String sql = "SELECT * FROM \"countOfVictoryOrDefeat\" WHERE \"nameGame\" = '{" + id.getNameGame() +"}'";

            try (Statement statement = conn.createStatement();
                 ResultSet resultSet = statement.executeQuery(sql)) {

                if (resultSet.next()) {
                    String count;
                    if (id.getMetric().equals("vic")) {
                        count = resultSet.getString("countVictory");
                    } else {
                        count = resultSet.getString("countDefeat");
                    }

                    metric = Optional.of(
                            new Metric(id.getNameGame(), count));

                    LOGGER.log(Level.INFO, "Found {0} in database", metric.get());
                }
            } catch (SQLException ex) {
                LOGGER.log(Level.SEVERE, null, ex);
            }

            return metric;
        });
    }

    @Override
    public Collection<Metric> getAll() {
        return null;
    }

    @Override
    public void save(Metric metric) {
    }

    @Override
    public void update(Metric metric, int count) {
        String message = "The customer to be updated should not be null";
        Metric nonNullMetric = Objects.requireNonNull(metric, message);
        String sql;
        if (metric.getMetric().equals("vic")) {
            sql =  "UPDATE \"countOfVictoryOrDefeat\""
                    + "SET "
                    + "\"countVictory\" =" + ++count + " "
                    + "WHERE "
                    + "\"nameGame\" = '{" + nonNullMetric.getNameGame() + "}'";
        } else  {
            sql =  "UPDATE \"countOfVictoryOrDefeat\""
                    + "SET "
                    + "\"countDefeat\" =" + ++count + " "
                    + "WHERE "
                    + "\"nameGame\" = '{" + nonNullMetric.getNameGame() + "}'";
        }
        connection.ifPresent(conn -> {
            try (PreparedStatement statement = conn.prepareStatement(sql)) {
                int numberOfUpdatedRows = statement.executeUpdate();

                LOGGER.log(Level.INFO, "Was the customer updated successfully? {0}",
                        numberOfUpdatedRows > 0);

            } catch (SQLException ex) {
                LOGGER.log(Level.SEVERE, null, ex);
            }
        });
    }

    @Override
    public void delete(Metric customer) {

    }
}
