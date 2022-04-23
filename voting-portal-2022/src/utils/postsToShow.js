export const postsToShow = (posts, voterInfo) => {
  if (voterInfo.gender) {
    if (voterInfo.gender === "Male" && voterInfo.degree === "B") {
      return [
        posts[0],
        {
          title: "Senate",
          subposts: [
            {
              title: "UG Senator",
              path: "ug",
            },
          ],
        },
      ];
    } else if (voterInfo.gender === "Female" && voterInfo.degree === "B") {
      return [
        posts[0],
        {
          title: "Senate",
          subposts: [
            {
              title: "UG Senator",
              path: "ug",
            },
            {
              title: "Girl Senator",
              path: "girl",
            },
          ],
        },
      ];
    } else if (
      voterInfo.gender === "Male" &&
      (voterInfo.degree === "M" || voterInfo.degree === "P")
    ) {
      return [
        posts[0],
        {
          title: "Senate",
          subposts: [
            {
              title: "PG Senator",
              path: "pg",
            },
          ],
        },
      ];
    } else if (
      voterInfo.gender === "Female" &&
      (voterInfo.degree === "M" || voterInfo.degree === "P")
    ) {
      return [
        posts[0],
        {
          title: "Senate",
          subposts: [
            {
              title: "PG Senator",
              path: "pg",
            },
            {
              title: "Girl Senator",
              path: "girl",
            },
          ],
        },
      ];
    }else{
        return posts;
    }
  } else {
    return posts;
  }
};
