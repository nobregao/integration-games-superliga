const MALE = 'male', FEMALE = 'female';
const SPORTV = 'sportv', VOLEI_BRASIL = 'volei brasil';

const API_SUPER_LIGA = 'https://api-superliga.cbv.com.br';
const TIME_END_GAME = 2;

const DAYS_FOR_GENERATE_GAMES = getDaysToSearch(7);


/** 
 * date / datetime 
 * */

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getDaysToSearch(daysForGenerate) {
  return Object.keys(new Array(daysForGenerate).fill(null)).map(Number)
}

function formatDate(date) {

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}

function formatTime(hour, minute, second) {
  return `${hour}:${minute ? minute : '00'}:${second ? second : '00'}-0300`
};


/** 
 * calendar 
 * */

const getCalendarHobbies = _ => CalendarApp.getCalendarById(ID_CALENDAR_HOBBIES)

function buildDescriptionCalendarEvent(home, guest, channel, gender) {

  const gamesTable = {
    male: 'https://superliga.cbv.com.br/tabela-de-jogos-masculino',
    female: 'https://superliga.cbv.com.br/tabela-de-jogos-feminino'
  }

  const _createBold = (text) => `<span><b>${text}</b></span>`;
  const _createAnchor = (text, url) => `<a href="${url}">${text}</a>`;

  let urls = "";

  if (channel && (channel = channel.toLowerCase())) {

    const CHANNELS = [{
      channel: "sportv",
      text: "globoplay sportv2",
      url: "https://globoplay.globo.com/sportv-2/ao-vivo/7339117/"
    }, {
      channel: "volei brasil",
      text: "canal volei brasil",
      url: "https://canalvoleibrasil.cbv.com.br/"
    }]

    CHANNELS.forEach(item => {
      if (channel.indexOf(item.channel) >= 0)
        urls += `\n${_createAnchor(item.text, item.url)}`;
    });
  } else {
    urls += `\n${_createBold("a definir transmissão")}`
  }

  return `${_createBold(home)} vs ${_createBold(guest)}
  \n${_createAnchor(`${gender}'s games table`, gamesTable[gender])}
  ${urls}`;
}

function createGamesCalendar(games) {
  games.forEach(game => getCalendarHobbies().createEvent(game.title, game.startDate, game.endDate, game.options));
}

function deletedFutureGamesCalendar() {

  const dateToday = new Date();
  dateToday.setHours(0);
  dateToday.setMinutes(0);
  dateToday.setSeconds(0);

  const dateEndPeriod = addDays(dateToday, DAYS_FOR_GENERATE_GAMES.unshift());
  dateEndPeriod.setHours(23);
  dateEndPeriod.setMinutes(59);
  dateEndPeriod.setSeconds(59);

  const nextGames = getCalendarHobbies().getEvents(dateToday, dateEndPeriod, { search: 'volleyball' });
  nextGames.reduce((acumulator, gameCBV) => gameCBV.deleteEvent(), 0)
}


/** 
 * games 
 * */

function getUrlsChampionsLegGender() {
  const formatURL = gender => `${API_SUPER_LIGA}/schedule/legs/${gender}`;

  return [formatURL(MALE), formatURL(FEMALE)]
}

function getUrlsByDate(date) {
  const formatURL = gender => `${API_SUPER_LIGA}/schedule/matches?gender=${gender}&date=${date}`;

  return [formatURL(MALE), formatURL(FEMALE)]
}

function getTitleGame(gender) {
  return `superliga - ${gender}'s volleyball`
}