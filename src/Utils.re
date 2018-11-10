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