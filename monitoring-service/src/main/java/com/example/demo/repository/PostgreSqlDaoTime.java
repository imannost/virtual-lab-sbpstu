package com.example.demo.repository;

import com.example.demo.Metric;
import com.example.demo.MetricTime;

import java.sql.*;
import java.util.Collection;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

public class PostgreSqlDaoTime implements Dao<MetricTime, Integer> {

    private static final Logger LOGGER =
            Logger.getLogger(PostgreSqlDao.class.getName());

    private final Optional<Connection> connection;

    public PostgreSqlDaoTime() {
        this.connection = JdbcConnection.getConnection();
    }
    @Override
    public Optional<MetricTime> get(Metric id) {
        return Optional.empty();
    }

    @Override
    public Collection<MetricTime> getAll() {
        return null;
    }

    @Override
    public void save(MetricTime metric) {
        String message = "The metric to be added should not be null";
        MetricTime nonNullMetric = Objects.requireNonNull(metric, message);
        String nameGame = "'{" + nonNullMetric.getNameGame() + "}',";
        String timeStart = "'{" +  nonNullMetric.getTimeStart().getTime() + "}',";
        String timeFinish = "'{" + nonNullMetric.getTimeFinish().getTime() + "}',";
        String timeInGame = "'{" +  nonNullMetric.getTimeInGame() + "}')";
        String sql = "INSERT INTO "
                + "\"GameTime\"(\"name_game\", \"time_start\", \"time_finish\", \"time_in_game\") "
                + "VALUES(" + nameGame + timeStart + timeFinish + timeInGame;

        connection.flatMap(conn -> {
            Optional<Integer> generatedId = Optional.empty();

            try (PreparedStatement statement =
                         conn.prepareStatement(
                                 sql,
                                 Statement.RETURN_GENERATED_KEYS)) {
                int numberOfInsertedRows = statement.executeUpdate();

                // Retrieve the auto-generated id
                if (numberOfInsertedRows > 0) {
                    try (ResultSet resultSet = statement.getGeneratedKeys()) {
                        if (resultSet.next()) {
                            generatedId = Optional.of(resultSet.getInt(1));
                        }
                    }
                }

                LOGGER.log(
                        Level.INFO,
                        "{0} created successfully? {1}",
                        new Object[]{nonNullMetric,
                                (numberOfInsertedRows > 0)});
            } catch (SQLException ex) {
                LOGGER.log(Level.SEVERE, null, ex);
            }

            return generatedId;
        });
    }

    @Override
    public void update(MetricTime metric, int count) {

    }

    @Override
    public void delete(MetricTime metric) {

    }
}
