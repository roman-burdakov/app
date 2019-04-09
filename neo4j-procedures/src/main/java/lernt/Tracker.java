package lernt;

import org.neo4j.graphdb.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Collection of data structures and methods
 * to keep track of state of course graph navigation
 */
public class Tracker
{
    private Set<Node> resultNodes;
    private Set<Relationship> resultRels;
    private Set<Long> visited;
    private Set<Node> heads;
    private Set<Node> userCompleted;
    private Set<UnorderedTuple> relTuples;


    public Tracker(Set<Node> userCompleted)
    {
        this.resultNodes = new HashSet<>();
        this.resultRels = new HashSet<>();
        this.visited = new HashSet<>();
        this.heads = new HashSet<>();
        this.userCompleted = userCompleted;
        this.relTuples = new HashSet<>();
    }


    public void addToResultNodes(Node node)
    {
        resultNodes.add(node);
    }

    // TODO: Arguably belongs in a factory class but OK
    public void makeRelationship(Node from, Node to)
    {
        RelationshipType type = RelationshipType.withName("NEXT");
        VirtualRelationship vr = new VirtualRelationship(from, to, type);
        addToResultRels(vr);
        UnorderedTuple ut = new UnorderedTuple(from.getId(), to.getId());
        relTuples.add(ut);
    }

    public boolean hasSomeRelationship(Node a, Node b)
    {
        UnorderedTuple ut = new UnorderedTuple(a.getId(), b.getId());
        return relTuples.contains(ut);
    }

    public void buildHead(GraphDatabaseService db) {
        VirtualNode head = new VirtualNode(-1, db);
        head.addLabel(Label.label("VirtualPathStart"));
        head.setProperty("name", "VirtualPathStart");

        for (Node node : heads) {
            VirtualRelationship rel = head.createRelationshipTo(node, RelationshipType.withName("NEXT"));
            addToResultRels(rel);
        }
        addToResultNodes(head);
    }

    private void addToResultRels(Relationship rel)
    {
        resultRels.add(rel);
    }


    public void addToVisited(Node node)
    {
        visited.add(node.getId());
    }

    public boolean isInVisited(Node node)
    {
        return visited.contains(node.getId());
    }


    public void addToHeads(Node node)
    {
        heads.add(node);
    }


    public void removeFromHeads(Node node)
    {
        heads.remove(node);
    }

    public boolean isInResultNodes(Node node)
    {
        return resultNodes.contains(node);
    }

    public int getResultNodesSize()
    {
        return resultNodes.size();
    }

    public List<Node> getResultNodesList()
    {
        ArrayList<Node> list = new ArrayList<>();
        list.addAll(resultNodes);
        return list;
    }

    public List<Relationship> getResultRelsList()
    {
        ArrayList<Relationship> list = new ArrayList<>();
        list.addAll(resultRels);
        return list;
    }

    public boolean hasUserCompleted(Node course)
    {
        return userCompleted.contains(course);
    }
}
