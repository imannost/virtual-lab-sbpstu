package com.example.demo;

public class Metric {
    private String nameGame;
    private String metric;

    public Metric(String nameGame, String metric) {
        this.nameGame = nameGame;
        this.metric = metric;
    }

    public String getNameGame() {
        return nameGame;
    }

    public void setNameGame(String nameGame) {
        this.nameGame = nameGame;
    }

    public String getMetric() {
        return metric;
    }

    public void setMetric(String metric) {
        this.metric = metric;
    }
}