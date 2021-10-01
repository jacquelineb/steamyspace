import * as cheerio from 'cheerio';

function steamProfileParser(profileHtml) {
  const $ = cheerio.load(profileHtml);

  function isPrivate() {
    return $('.private_profile')['0'] ? true : false;
  }

  function getActivity() {
    const game = $('.profile_in_game_name').text();
    const status = $('.profile_in_game_header').text();
    return {
      game,
      status,
    };
  }

  function getUser() {
    function getRealName() {
      return $('.header_real_name > bdi').text();
    }

    function getLocation() {
      const locationCheerio = $('.profile_flag')['0'];
      if (locationCheerio) {
        return locationCheerio.next.data.trim();
      }
      return null;
    }

    return {
      username: $('.actual_persona_name').text().trim(),
      avatar: $('.playerAvatarAutoSizeInner > img').attr('src'),
      personalInfo: {
        realName: getRealName(),
        location: getLocation(),
      },
    };
  }

  function getRecentGames() {
    const recentGamesData = $('.recent_game').toArray();
    const recentGames = recentGamesData.map((gameInfo) => {
      const name = $('.game_name', gameInfo).text().trim();
      const storePage = $('.game_name > a', gameInfo).attr('href');
      const coverArt = $('.game_capsule', gameInfo).attr('src');
      const totalHoursPlayed = $('.game_info_details', gameInfo)['0'].children[0].data.trim();
      const lastPlayedDate = $('.game_info_details', gameInfo)['0'].children[2].data.trim();
      return {
        name,
        coverArt,
        totalHoursPlayed,
        storePage,
        lastPlayedDate,
      };
    });

    return recentGames;
  }

  function getSummary() {
    return $('.profile_summary').html().trim();
  }

  function getTopFriendsSection() {
    const totalFriends = $('.profile_count_link_total', '.profile_friend_links').text().trim();
    const topFriends = $('.friendBlock', '.profile_topfriends')
      .toArray()
      .map((friend) => {
        const friendData = {
          username: $('.friendBlockContent', friend)['0'].firstChild.data.trim(),
          profileUrl: $('.friendBlockLinkOverlay', friend).attr('href'),
          avatar: $('img', friend).attr('src').replace('medium', 'full'),
        };

        return friendData;
      });

    return {
      totalFriends,
      topFriends,
    };
  }

  const profileNotExist = $('.error_ctn')['0'];
  if (profileNotExist) {
    return null;
  }

  return { isPrivate, getActivity, getRecentGames, getSummary, getUser, getTopFriendsSection };
}

export { steamProfileParser };
