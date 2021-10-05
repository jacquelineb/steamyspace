import * as cheerio from 'cheerio';

function steamProfileParser(profileHtml) {
  const $ = cheerio.load(profileHtml);

  const profileNotExist = $('.error_ctn')['0'];
  if (profileNotExist) {
    return null;
  }

  return {
    isPrivate,
    getActivity,
    getBanStatus,
    getCommentCount,
    getFriendCount,
    getGroups,
    getRecentGames,
    getSummary,
    getTopFriends,
    getUser,
  };

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

  function getBanStatus() {
    let profileBans = [];
    const profileBanNodes = $('.profile_ban');
    if (profileBanNodes.length) {
      profileBans = profileBanNodes.toArray().map((profileBanNode) => {
        const banDescription = profileBanNode.children[0].data.trim();
        return banDescription;
      });
    }

    return profileBans;
  }

  function getCommentCount() {
    const commentSection = $('.commentthread_header')['0'];
    if (commentSection) {
      // Comment count is only displayed if user has over 6 comments on their page.
      // If it's not displayed, then the only way to get it is to count the number of nodes that have a class of 'commentthread_comment'
      const countNode = $('span[id$="_totalcount"]', commentSection);
      if (countNode.length) {
        return parseInt(countNode.text().replace(',', ''));
      } else {
        return parseInt($('.commentthread_comment').length);
      }
    } else {
      return 0;
    }
  }

  function getFriendCount() {
    let friendCount = $('.profile_count_link_total', '.profile_friend_links').text().trim();
    if (!friendCount) {
      return 0;
    } else {
      friendCount = friendCount.replace(',', '');
      return parseInt(friendCount);
    }
  }

  function getGroups() {
    const groupNodes = $('.profile_group');
    if (groupNodes.length) {
      const groups = groupNodes.toArray().map((groupNode) => {
        const name = $('.whiteLink', groupNode).text().trim();
        let avatar = $('.profile_group_avatar img', groupNode).attr('src');
        if (avatar.indexOf('_medium.jpg') === -1) {
          avatar = avatar.replace('.jpg', '_medium.jpg');
        }
        const memberCount = $('.profile_group_membercount', groupNode).text();
        return { name, avatar, memberCount };
      });

      return groups;
    } else {
      return null;
    }
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

  function getTopFriends() {
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

    return topFriends;
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
}

function steamCommentsParser(commentsHtml) {
  const $ = cheerio.load(commentsHtml);
  return $('.commentthread_comment')
    .toArray()
    .map((comment) => {
      const commentContent = {
        author: {
          username: $('bdi', comment).text(),
          avatar: $('img', comment).attr('src').slice(0, -4) + '_full.jpg',
          profilePath: $('.commentthread_author_link', comment).attr('href').substr(26),
        },
        timeStamp: $('.commentthread_comment_timestamp', comment).text().trim(),
        body: $('.commentthread_comment_text', comment).html().trim(),
      };
      return commentContent;
    });
}

export { steamProfileParser, steamCommentsParser };
