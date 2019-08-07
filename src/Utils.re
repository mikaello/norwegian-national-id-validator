let charIsInt = intCandidate => {
  let code = Char.code(intCandidate);
  code >= 48 && code <= 57; /* ASCII values */
};

let rec explode = aString =>
  switch (aString) {
  | "" => []
  | char => [
      char.[0],
      ...explode(String.sub(aString, 1, String.length(aString) - 1)),
    ]
  };

let stringIsAllInts = allIntCandidate =>
  allIntCandidate |> explode |> List.for_all(charIsInt);

let charToAsciiInt = char => String.make(1, char) |> int_of_string;

let isValidDate =
    (~year, ~month, ~date, ~hours=0., ~minutes=0., ~seconds=0., ()) => {
  let makeLastDayOfMonth = date =>
    Js.Date.(
      makeWithYMD(
        ~year=date |> getFullYear,
        ~month=(date |> getMonth) +. 1.,
        ~date=0.,
        (),
      )
    );

  year <= 199999.
  && year >= (-199999.)
  && month <= 11.
  && month >= 0.
  && date >= 1.
  && date
  <= Js.Date.(makeWithYM(~year, ~month, ()) |> makeLastDayOfMonth |> getDate)
  && hours >= 0.
  && hours <= 23.
  && minutes >= 0.
  && minutes <= 59.
  && seconds >= 0.
  && seconds <= 59.;
};

let diffYears = (startDate, endDate) => {
  open Js.Date;
  let yStart = getFullYear(startDate);
  let mStart = getMonth(startDate);
  let dStart = getDate(startDate);

  let yEnd = getFullYear(endDate);
  let mEnd = getMonth(endDate);
  let dEnd = getDate(endDate);

  let diff = yStart -. yEnd;
  let correctedDiff =
    if (mEnd > mStart || mEnd === mStart && dEnd > dStart) {
      diff -. 1.;
    } else {
      diff;
    };

  correctedDiff |> int_of_float;
};