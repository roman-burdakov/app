/**
 * Checks if all courses in a given relationship exist
 * Important for validating a learning path that is being created
 * @param {Session} session The Neo4j session
 * @param {Array} relationships [{start: courseID, end: courseId}, ...]
 * @returns {Boolean}
 */
exports.checkIfAllCoursesExist = (session, relationships) => {
  let courseSet = new Set();
  relationships.forEach(rel => {
    courseSet.add(rel.start);
    courseSet.add(rel.end);
  });
  let courseIDList = [...courseSet];

  let query = `
    UNWIND {courseIDList} AS courseID
    MATCH (c: Course { id: {courseID} })
    RETURN count(c) AS count
  `;

  const res = session.run(query, { courseIDList });
  return res.get('count').toNumber() === courseIDList.length;
};