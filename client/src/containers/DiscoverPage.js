import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';

import compose from 'recompose/compose';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import {
  followUser,
  getFollowing,
  getUser,
  getAllUsers,
  unfollowUser
} from '../actions/userActions';
import NavbarContainer from './NavbarContainer';
import Loading from '../components/Loading';
import UserCard from '../components/UserCard';

// MDS code...

class Node {
  constructor(id, properties) {
    this.id = id;
    this.properties = properties;
    this.edges = [];
  }

  addEdge(edge) {
    this.edges.push(edge);
  }
}

class Edge {
  constructor(startNode, endNode, relationship, properties) {
    this.startNode = startNode;
    this.endNode = endNode;
    this.relationship = relationship;
    this.properties = properties;
  }
}

class Graph {
  constructor() {
    this.nodes = {};
    this.edges = [];
  }

  addNode(id, properties) {
    if (!this.nodes[id]) {
      this.nodes[id] = new Node(id, properties);
    }
  }

  addEdge(startNodeId, endNodeId, relationship, properties) {
    const startNode = this.nodes[startNodeId];
    const endNode = this.nodes[endNodeId];

    if (startNode && endNode) {
      const edge = new Edge(startNode, endNode, relationship, properties);
      startNode.addEdge(edge);
      this.edges.push(edge);
    }
  }

  // getNode(id) {
  //   return this.nodes[id];
  // }

  // getEdgesForNode(id) {
  //   const node = this.getNode(id);
  //   return node ? node.edges : [];
  // }
}

const graph = new Graph();

graph.addNode("founder1", { founder_name: "Founder 1", age: 30 });
graph.addNode("founder2", { founder_name: "Founder 2", age: 35 });
graph.addNode("founder3", { founder_name: "Founder 3", age: 35 });
graph.addNode("founder4", { founder_name: "Founder 4", age: 40 });
graph.addNode("founder5", { founder_name: "Founder 5", age: 28 });
graph.addNode("founder5", { founder_name: "Founder 5", age: 33 });
graph.addNode("founder6", { founder_name: "Founder 6", age: 29 });
graph.addNode("founder7", { founder_name: "Founder 7", age: 45 });
graph.addNode("founder8", { founder_name: "Founder 8", age: 27 });
graph.addNode("founder9", { founder_name: "Founder 9", age: 36 });
graph.addNode("founder10", { founder_name: "Founder 10", age: 31 });

graph.addNode("startup1", { startup_name: "Startup 1", industry: "Tech" });
graph.addNode("startup2", {
  startup_name: "Startup 2",
  industry: "Healthcare",
});
graph.addNode("startup3", { startup_name: "Startup 3", industry: "Healthcare" });
graph.addNode("startup4", { startup_name: "Startup 4", industry: "Finance" });
graph.addNode("startup5", { startup_name: "Startup 5", industry: "Education" });

graph.addNode("startup5", { startup_name: "Startup 5", industry: "Retail" });
graph.addNode("startup6", { startup_name: "Startup 6", industry: "Entertainment" });
graph.addNode("startup7", { startup_name: "Startup 7", industry: "Fashion" });
graph.addNode("startup8", { startup_name: "Startup 8", industry: "Food" });
graph.addNode("startup9", { startup_name: "Startup 9", industry: "Automotive" });
graph.addNode("startup10", { startup_name: "Startup 10", industry: "Real Estate" });
graph.addNode("startup11", { startup_name: "Startup 11", industry: "Travel" });
graph.addNode("startup12", { startup_name: "Startup 12", industry: "Sports" });

graph.addEdge("founder1", "startup1", "FOUNDED", {
  role: "CEO",
  join_date: "2022-01-01",
});
graph.addEdge("founder2", "startup2", "FOUNDED", {
  role: "CEO",
  join_date: "2023-01-01",
});
graph.addEdge("founder3", "startup3", "FOUNDED", {
  role: "Co-founder",
  join_date: "2022-02-15",
});
graph.addEdge("founder4", "startup4", "FOUNDED", {
  role: "Co-founder",
  join_date: "2021-12-10",
});
graph.addEdge("founder5", "startup5", "FOUNDED", {
  role: "CEO",
  join_date: "2023-05-20",
});
graph.addEdge("founder6", "startup6", "FOUNDED", {
  role: "CTO",
  join_date: "2024-03-01",
});
graph.addEdge("founder7", "startup7", "FOUNDED", {
  role: "COO",
  join_date: "2022-10-05",
});
graph.addEdge("founder8", "startup8", "FOUNDED", {
  role: "Founder",
  join_date: "2023-08-12",
});
graph.addEdge("founder9", "startup9", "FOUNDED", {
  role: "Founder",
  join_date: "2021-11-18",
});
graph.addEdge("founder10", "startup10", "FOUNDED", {
  role: "Co-founder",
  join_date: "2024-01-30",
});
graph.addEdge("founder11", "startup11", "FOUNDED", {
  role: "CEO",
  join_date: "2022-07-25",
});
graph.addEdge("founder12", "startup12", "FOUNDED", {
  role: "CEO",
  join_date: "2023-04-10",
});
graph.addEdge("founder1", "founder2", "FOLLOWS", {
  follower_id: "founder1",
  interaction_frequency: "Weekly"
});


graph.addNode("founder5", { founder_name: "Founder 5", age: 33 });
graph.addNode("founder6", { founder_name: "Founder 6", age: 29 });
graph.addNode("founder7", { founder_name: "Founder 7", age: 45 });
graph.addNode("founder8", { founder_name: "Founder 8", age: 27 });
graph.addNode("founder9", { founder_name: "Founder 9", age: 36 });
graph.addNode("founder10", { founder_name: "Founder 10", age: 31 });
graph.addNode("startup5", { startup_name: "Startup 5", industry: "Retail" });
graph.addNode("startup6", { startup_name: "Startup 6", industry: "Entertainment" });
graph.addNode("startup7", { startup_name: "Startup 7", industry: "Fashion" });
graph.addNode("startup8", { startup_name: "Startup 8", industry: "Food" });
graph.addNode("startup9", { startup_name: "Startup 9", industry: "Automotive" });
graph.addNode("startup10", { startup_name: "Startup 10", industry: "Real Estate" });
graph.addNode("startup11", { startup_name: "Startup 11", industry: "Travel" });
graph.addNode("startup12", { startup_name: "Startup 12", industry: "Sports" });
console.log(2)


function computeTotalDominatingSet(graph) {
  console.log(2)
  for (const node of Object.values(graph.nodes)) {
    node.weight = Math.random();
    node.markedcount = 0; 
  }
  let t;
  for (const node of Object.values(graph.nodes)) {
    t = 0;
    for (const edge of node.edges) {
      t++;
    }

    node.weight += t;
  //   console.log(node.weight);
  }

  for (const node of Object.values(graph.nodes)) {
    let maxWeightNeighbor = null;
    let maxWeight = -1;
    for (const edge of node.edges) {
      if (edge.endNode.weight > maxWeight) {
        maxWeight = edge.endNode.weight;
        maxWeightNeighbor = edge.endNode;
      }
    }
    if (maxWeightNeighbor) {
      maxWeightNeighbor.marked = true;
      maxWeightNeighbor.markedcount += 1;
    }
  }
  const rounds = 10;
  for (let j = 0; j < rounds; j++) {
    for (const node of Object.values(graph.nodes)) {
      node.weight = 0;
      node.weight += Math.random();
      node.weight += node.markedcount;
      node.markedcount = 0;
      node.marked = false;
    }

    for (const node of Object.values(graph.nodes)) {
      let maxWeightNeighbor = null;
      let maxWeight = -1;
      for (const edge of node.edges) {
        if (edge.endNode.weight > maxWeight) {
          maxWeight = edge.endNode.weight;
          maxWeightNeighbor = edge.endNode;
        }
      }
      if (maxWeightNeighbor) {
        maxWeightNeighbor.marked = true;
        maxWeightNeighbor.markedcount += 1;
      }
    }
  }

  

  const totalDominatingSet = [];
  for (const node of Object.values(graph.nodes)) {
    if (node.marked) {
      totalDominatingSet.push(node.id);
    }
  }

  return totalDominatingSet;
}
console.log(2)

const totalDominatingSet = computeTotalDominatingSet(graph);






//mds code end
const styles = theme => ({
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`
  },
  layout: {
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3
    }
  }
});

class DiscoverPage extends Component {
  state = {
    loading: true,
    following: [],
    totalDominatingSet: [] // Add state to hold totalDominatingSet
  };

  componentDidMount = () => {
    const { history, retrieveAllUsers } = this.props;
    if (!localStorage.jwtToken) {
      history.push('/login');
    }

    retrieveAllUsers().then(() => {
      this.updateFollowing();
      this.setState({
        loading: false
      });
    });

    // Set totalDominatingSet from MDS computation
    this.setState({
      totalDominatingSet: totalDominatingSet // Assuming totalDominatingSet is defined globally or imported
    });
  };

  componentDidUpdate(prevProps) {
    const { userReducer } = this.props;
    if (!equal(userReducer.following, prevProps.userReducer.following)) {
      this.updateFollowing();
    }
  }

  updateFollowing = () => {
    const { authReducer, getCurrUser } = this.props;
    getCurrUser(authReducer.user.userId).then((res) => {
      this.setState({
        following: res.payload.user.following
      });
    });
  };

  render() {
    const {
      authReducer,
      classes,
      followThisUser,
      getCurrUser,
      userReducer,
      unfollowThisUser
    } = this.props;
    const { following, loading, totalDominatingSet } = this.state;

    return loading ? (
      <div>
        <NavbarContainer />
        <Loading />
      </div>
    ) : (
      <div>
        <NavbarContainer />
        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container justify="center" spacing={40}>
              {userReducer.allUsers.map(
                user =>
                  (user._id === authReducer.user.userId ? null : (
                    <Grid item key={user._id} sm={6} md={3} lg={2}>
                      <UserCard
                        isFollowing={following.includes(user._id)}
                        followUser={followThisUser}
                        getUser={getCurrUser}
                        listedUser={user}
                        signedInUser={authReducer.user}
                        unfollowUser={unfollowThisUser}
                      />
                    </Grid>
                  ))
              )}
            </Grid>
          </div>
          {/* Render totalDominatingSet */}
          <div>
            <h2>Total Dominating Set (Popular Founders)</h2>
            <ul>
              {totalDominatingSet.map(founder => (
                <li key={founder.id}>
                  {founder.properties.founder_name} - {founder.properties.age}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    );
  }
}

DiscoverPage.propTypes = {
  authReducer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  followThisUser: PropTypes.func.isRequired,
  getCurrUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  retrieveAllUsers: PropTypes.func.isRequired,
  unfollowThisUser: PropTypes.func.isRequired,
  userReducer: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  userReducer: state.userReducer
});

const mapDispatchToProps = dispatch => ({
  getCurrUser: id => dispatch(getUser(id)),
  getFollowingUsers: id => dispatch(getFollowing(id)),
  followThisUser: (signedInUserId, idToFollow) =>
    dispatch(followUser(signedInUserId, idToFollow)),
  retrieveAllUsers: () => dispatch(getAllUsers()),
  unfollowThisUser: (signedInUserId, idToUnfollow) =>
    dispatch(unfollowUser(signedInUserId, idToUnfollow))
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DiscoverPage);
