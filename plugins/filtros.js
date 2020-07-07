import Vue from "vue";
import parse from "date-fns/parse";
import format from "date-fns/format";
import es from "date-fns/locale/es";

Vue.filter("fecha", (dateString, formatString) => {
  if (dateString) {
    const date = parse(String(dateString), "yyyy-MM-dd", new Date(), {
      locale: es,
    });
    // https://date-fns.org/v2.14.0/docs/format
    return format(date, formatString);
  }
});
