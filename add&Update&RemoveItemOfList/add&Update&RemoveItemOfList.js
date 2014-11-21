Players = new Mongo.Collection("players");

if (Meteor.isClient){
  Template.playerList.players = function  () {
    return Players.find();
  };

  Template.playerForm.events({
    'click button' : function(e,t){
      var el = t.find("#playername");
      Players.insert({playername: el.value});
      el.value = "";
    }
  });

  Template.player.editing = function () {
    return Session.get("edit-" + this._id)
  };

  Template.player.rendered = function(){
    var input = this.find("input");
      if (input){
        input.focus();
      }
  };

  Template.player.events({
    'click .playername': function(e,t){
      Session.set("edit-" + t.data._id, true)
    },
    'keypress input': function(e,t){
      if (e. keyCode === 13) {
        Players.update( {_id: t.data._id} , {$set: {playername: e.currentTarget.value}});
        Session.set("edit-" + t.data._id, false);
      };
    },
    'click .del': function(e,t){
      Players.remove( {_id: t.data._id} );
    }
  });

}