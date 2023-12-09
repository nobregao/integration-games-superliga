function main() {
  const now = new Date()

  const nextSevenDays = DAYS_FOR_GENERATE_GAMES.map(numberAddDay => addDays(now, numberAddDay))
  const urlsByGender = nextSevenDays.flatMap(date => getUrlsByDate(formatDate(date)))
  const responseApiSuperliga = urlsByGender.flatMap(url => JSON.parse(UrlFetchApp.fetch(url).getContentText()))

  const games = responseApiSuperliga
    .filter(item => item.transmission != VOLEI_BRASIL)
    .map(item => _mapItemCalendar(item));

  deletedFutureGamesCalendar();

  createGamesCalendar(games);
}

function _mapItemCalendar(item) {

  let timeArray = item.hour.split(":").map(itemTime => parseInt(itemTime));

  let home = item.home_team.name.toLowerCase();
  let guest = item.guest_team.name.toLowerCase();
  let date = item.date
  let time = {
    start: formatTime(...timeArray),
    end: formatTime(timeArray[0] + TIME_END_GAME, timeArray[1], timeArray[2])
  };

  let gender = item.gender.toLowerCase();

  let options = {
    description: buildDescriptionCalendarEvent(home, guest, item.transmission, gender)
  };

  return {
    title: getTitleGame(gender),
    startDate: new Date(`${date} ${time.start}`),
    endDate: new Date(`${date} ${time.end}`),
    isPending: true,
    options
  }
}