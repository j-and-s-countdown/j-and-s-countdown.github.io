<template lang="pug">
  b-container
    .content
      b-row
        b-col(:cols="12" :offset="0" :md="10" :offset-md="1")
          iframe(width="100%" height="300px" src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyA_cCuzrgK74gzWtV80H6BTneG0C4EAMQM&destination=51.0151328,-114.0694888&origin=47.4526784,8.3183322&mode=flying" frameborder="0" style="border:0")
          p {{ (7758 * percentageRemaining).toFixed(4) }}km
          b-table.table-dark(:items="new Array(remaining)" :fields="['days', 'hours', 'minutes', 'seconds']")

    footer
      loading-progress(
        :progress="1 - percentageRemaining"
        indeterminate=false
        counter-clockwise=false
        hide-background=false
        shape="line"
        size="800"
        width="800"
        height="10"
      )
      p {{ (100 - 100 * percentageRemaining).toFixed(2) }}%

      .card.text-center(style="margin-bottom:100px;")
        .card-header
          h4 Message of the Day
        .card-block(style="vertical-align: middle;")
          p {{ todaysMessage }}
</template>

<style lang="less">
.content p { text-align: center; }
table { width: 100%; table-layout: fixed; }
footer {
  .vue-progress-path {
    &, svg { width: 100% !important; }
    path { stroke-width: 10; }
    .background { stroke: #ddd }
    .progress { stroke: #40b883 }
  }

  p {
    text-align: center;
    margin-top: 5px;
  }
}
</style>

<script>
const messages = require('../days.json');
const valentines = moment('2018-02-13T12:00Z').tz('America/Edmonton');
const leaving = moment('2017-05-11T07:15Z').tz('America/Edmonton');
const arrival = moment('2018-05-17T10:45Z').tz('Europe/Dublin');

export default {
  name: 'app',
  data() {
    return {
      moment,
      now: moment(),
      leaving,
      arrival,
      messages,
    };
  },
  mounted() {
    setInterval(() => this.now = moment(), 10);
  },
  computed: {
    totalRemaining() {
      return {
        seconds: arrival.diff(this.now, 'seconds'),
        minutes: arrival.diff(this.now, 'minutes'),
        hours: arrival.diff(this.now, 'hours'),
      };
    },
    remaining() {
      const diff = arrival.diff(this.now, 'seconds', true);
      const seconds = diff % 60;
      const minutes = (diff / 60) % 60;
      const hours = (diff / 60 / 60) % 24;
      const days = (diff / 60 / 60 / 24);

      return {
        days: days.toFixed(0),
        hours: hours.toFixed(0),
        minutes: minutes.toFixed(0),
        seconds: seconds.toFixed(0),
      };
    },
    percentageRemaining() {
      return this.totalRemaining.seconds / this.arrival.diff(this.leaving, 'seconds');
    },
    todaysMessage() {
      return this.messages[arrival.diff(valentines, 'days') - arrival.diff(this.now, 'days')];
    },
  },
}
</script>
