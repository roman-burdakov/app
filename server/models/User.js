class User {
  constructor(properties) {
    const { id, name } = properties;
    this.id = id;
    this.name = name;
  }

  static async findAll(session) {
    const query = 'MATCH (user: User) RETURN user';
    const results = await session.run(query, {});
    const records = results.records;
    if (records.length === 0) {
      return undefined;
    }
    var users = records.map (r => r.get('user').properties)
    return users;
  }

  static async findById(session, id) {
    const query = `
    MATCH (u: User {userID: $id})
    OPTIONAL MATCH ()-[:INTERESTED]->(interested_skills: Skill)
    OPTIONAL MATCH ()-[:EXPERIENCED]->(experienced_skills: Skill)
    OPTIONAL MATCH ()-[:LEARNS_BY]->(learning_style: LearningStyle)
    OPTIONAL MATCH ()-[:SUBSCRIBED]->(path_start: PathStart)<-[:CREATED]-(path_creator: User)
    WITH {
    	  userID : u.userID,
        username : u.username,
        bio : u.bio,
        interest: collect(DISTINCT  PROPERTIES(interested_skills)), 
        experience: collect(DISTINCT PROPERTIES(experienced_skills)),
        learningType: collect(DISTINCT PROPERTIES(learning_style)),
    	  learningPaths : collect(distinct({name: path_start.name, pathID:path_start.pathID, creator: PROPERTIES(path_creator)}))
        } as returnUser
    RETURN returnUser as user
    `;
    // TODO: Think of an abstraction layer to get properties easily
    // This is going to get tiring quickly
    const results = await session.run(query, { id });
    const records = results.records;
    if (records.length === 0) {
      return undefined;
    }
    let result = records[0];
    return result.get('user');
  }

  static async save(session, user) {
    //TODO this could be improved by figuring out a way to save in a single query. Keeping it simple currently with seperate queries 
    const updateUserNode = `
    MATCH (u: User {userID: $id})
    SET u.username = $username, u.bio = $bio
    `
    const updateExperiences =`
    MATCH (u: User {userID: $id})
    MATCH(s: Skill {skillID: $skillID}) 
    MERGE(u)-[:EXPERIENCED]->(s)
    `
    const updateInterests =`
    MATCH (u: User {userID: $id})
    MATCH(s: Skill {skillID: $skillID}) 
    MERGE(u)-[:INTERESTED]->(s)
    `
    const updateLearningStyle =`
    MATCH (u: User {userID: $id})
    MATCH(s: LearningStyle {learningStyleID: $learningStyleID}) 
    MERGE(u)-[:LEARNS_BY]->(s)
    `

    await session.run(updateUserNode, { id: user.userID, username: user.username, bio: user.bio });

    for (var skill of user.experience) {
      await session.run(updateExperiences, { id: user.userID, skillID: skill.skillID});
    }

    for (var skill of user.interest) {
      await session.run(updateInterests, { id: user.userID, skillID: skill.skillID});
    }

    for (var style of user.learningType) {
      await session.run(updateLearningStyle, { id: user.userID, learningStyleID: style.learningStyleID});
    }


    return this.findById(session, user.userID);
  }
}

module.exports = User;
