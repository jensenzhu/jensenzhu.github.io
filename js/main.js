/**
 * Created by macpro on 15/9/10.
 */
var data = [
    {key:0, value:"世", time:"2s", delay:"0s", width:"50px", height:"60px", x:"20px", y:"20px"},
    {key:1,value:"界", time:"2s", delay:"2s", width:"50px", height:"60px", x:"70px", y:"20px"},
    {key:2,value:"你", time:"2s", delay:"4s", width:"50px", height:"60px", x:"120px", y:"20px"},
    {key:3,value:"好", time:"2s", delay:"6s", width:"50px", height:"60px", x:"170px", y:"20px"}
];
var Word = React.createClass({

    render:function(){
        var ani = 'ani-h3 '+this.props.time+' forwards infinite';
        var divStyle = {
            position: 'absolute',
            left: this.props.x,
            top: this.props.y,
            width: this.props.width,
            height: this.props.height,
            WebkitAnimation: ani,
            animation: ani,
            animationDelay:this.props.delay,
            WebkitAnimationDelay:this.props.delay,
            animationIterationCount:'1',
            WebkitAnimationIterationCount:'1',
            cursor:'pointer'
        };
        var divStyleNo = {
            position: 'absolute',
            left: this.props.x, // 注意这里的首字母'W'是大写
            top: this.props.y, // 'ms'是唯一一个首字母需要小写的浏览器前缀
            width: this.props.width,
            height: this.props.height,
            cursor:'pointer'
        };
        return(
            <li className={(this.props.begin=="true") ? "word" : "word_no"} style={(this.props.begin=="true") ? divStyle : divStyleNo}>{this.props.value}</li>
            );
    }
});
var Sentence = React.createClass({
    getInitialState: function() {
        return {run: false};
    },
    handleClick: function(event) {
        this.setState({run: !this.state.run});
    },
    render: function() {
        var text = this.state.run ? 'true' : 'false';
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Word key={comment.key} value={comment.value} begin={text} time={comment.time} delay={comment.delay} width={comment.width} height={comment.height} x={comment.x} y={comment.y}/>
                );
        });
        return (
            <div id="sentence" onClick={this.handleClick}>
                {commentNodes}
            </div>
            );
    }
});
React.render(
    <Sentence data={data}/>,
    document.getElementById('example')
);
//less.modifyVars({
//    '@time': '1s'
//});
//var CommentBox = React.createClass({
//    render: function() {
//        return (
//            <div className="commentBox">
//            Hello, world! I am a CommentBox.
//            </div>
//            );
//    }
//});
//React.render(
//    <CommentBox />,
//    document.getElementById('example')
//);
//var LikeButton = React.createClass({
//    getInitialState: function() {
//        return {liked: false};
//    },
//    handleClick: function(event) {
//        this.setState({liked: !this.state.liked});
//    },
//    render: function() {
//        var text = this.state.liked ? 'like' : 'haven\'t liked';
//        return (
//            <p onClick={this.handleClick}>
//            You {text} this. Click to toggle.
//            </p>
//            );
//    }
//});
//
//React.render(
//    <LikeButton />,
//    document.getElementById('example')
//);