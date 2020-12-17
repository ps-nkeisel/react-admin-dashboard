export const makeArrayFromOffensiveList = offensiveList => {
  if (typeof offensiveList !== "string" || !offensiveList) {
    return [];
  }

  return offensiveList.indexOf("|") > -1
    ? offensiveList.split("|")
    : [offensiveList];
};

export const calculatePermissions = permissions => {
  let total = 0;

  if (permissions.all) {
    return 55;
  } else {
    if (permissions.revenue) {
      total++;
    }

    if (permissions.analytics) {
      total += 2;
    }

    if (permissions.moderation) {
      total += 4;
    }

    if (permissions.integration) {
      total += 16;
    }

    if (permissions.userManagement) {
      total += 32;
    }
  }

  return total;
};

export const getPermissionsFromPoints = points => {
  const permissionsObject = {};

  if (points === 55) {
    return { all: true };
  } else {
    if (points >= 32) {
      permissionsObject.userManagement = true;
      points -= 32;
    }

    if (points >= 16) {
      permissionsObject.integration = true;
      points -= 16;
    }

    if (points >= 4) {
      permissionsObject.moderation = true;
      points -= 4;
    }

    if (points >= 2) {
      permissionsObject.analytics = true;
      points -= 2;
    }

    if (points >= 1) {
      permissionsObject.revenue = true;
      points--;
    }
  }

  return permissionsObject;
};

export const calculateLoginTypes = loginTypes => {
  let total = 0;

  if (loginTypes.password) {
    total++;
  }

  if (loginTypes.facebook) {
    total += 2;
  }

  if (loginTypes.google) {
    total += 4;
  }

  if (loginTypes.twitter) {
    total += 8;
  }

  if (loginTypes.disqus) {
    total += 16;
  }

  if (loginTypes.guest) {
    total += 32;
  }

  if (loginTypes.sso) {
    total += 64;
  }

  return total;
};

export const calculateLoginTypes2 = (loginTypesArr, rawForm = false) => {
  let total = 0;

  if (loginTypesArr.includes('password') || (rawForm && loginTypesArr[0].isAllowed)) {
    total++;
  }

  if (loginTypesArr.includes('facebook') || (rawForm && loginTypesArr[1].isAllowed)) {
    total += 2;
  }

  if (loginTypesArr.includes('google') || (rawForm && loginTypesArr[2].isAllowed)) {
    total += 4;
  }

  if (loginTypesArr.includes('twitter') || (rawForm && loginTypesArr[3].isAllowed)) {
    total += 8;
  }

  if (loginTypesArr.includes('disqus') || (rawForm && loginTypesArr[4].isAllowed)) {
    total += 16;
  }

  if (loginTypesArr.includes('guest') || (rawForm && loginTypesArr[5].isAllowed)) {
    total += 32;
  }

  if (loginTypesArr.includes('sso') || (rawForm && loginTypesArr[6].isAllowed)) {
    total += 64;
  }

  return total;
};
