package com.example.demo;

import java.util.GregorianCalendar;

public class MetricTime {

    private String nameGame;

    private GregorianCalendar timeStart;

    private GregorianCalendar timeFinish;

    private String timeInGame;

    public MetricTime(String nameGame, GregorianCalendar timeStart, GregorianCalendar timeFinish) {
        this.nameGame = nameGame;
        this.timeStart = timeStart;
        this.timeFinish = timeFinish;
    }

    public String getNameGame() {
        return nameGame;
    }

    public void setNameGame(String nameGame) {
        this.nameGame = nameGame;
    }

    public GregorianCalendar getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(GregorianCalendar timeStart) {
        this.timeStart = timeStart;
    }

    public GregorianCalendar getTimeFinish() {
        return timeFinish;
    }

    public void setTimeFinish(GregorianCalendar timeFinish) {
        this.timeFinish = timeFinish;
    }

    public String getTimeInGame() {
        return timeInGame;
    }

    public void setTimeInGame(String timeInGame) {
        this.timeInGame = timeInGame;
    }
}
