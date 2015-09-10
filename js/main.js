/**
 * Created by macpro on 15/9/10.
 */

var Word = React.createClass({

    render:function(){
        var ani = 'ani-h3 '+this.props.time+'s forwards infinite';
        var divStyle = {
            display: 'block',
            fontSize: this.props.width,
            margin: '0 auto',
            fontFamily: 'Arial',
            textAlign: 'center',
            color: 'transparent',
            backgroundColor: '#000',
            backgroundImage: 'url(bg.png)',
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
            WebkitBackgroundSize: '0% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            float:'left',
//            position: 'absolute',
//            left: this.props.x,
//            top: this.props.y,
            width: this.props.width,
            height: this.props.height,
            WebkitAnimation: ani,
            animation: ani,
            animationDelay:this.props.delay+'s',
            WebkitAnimationDelay:this.props.delay+'s',
            animationIterationCount:'1',
            WebkitAnimationIterationCount:'1',
            cursor:'pointer',
            listStyle:'none', /* 将默认的列表符号去掉 */
            padding:'0', /* 将默认的内边距去掉 */
            margin:'0' /* 将默认的外边距去掉 */
        };
        var divStyleNo = {
            display: 'block',
            fontSize: this.props.width,
            margin: '0 auto',
            fontFamily: 'Arial',
            textAlign: 'center',
            color: 'transparent',
            backgroundColor: '#000',
            backgroundImage: 'url(bg.png)',
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
            WebkitBackgroundSize: '0% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            float:'left',
//            position: 'absolute',
//            left: this.props.x, // 注意这里的首字母'W'是大写
//            top: this.props.y, // 'ms'是唯一一个首字母需要小写的浏览器前缀
            width: this.props.width,
            height: this.props.height,
            cursor:'pointer',
            listStyle:'none', /* 将默认的列表符号去掉 */
            padding:'0', /* 将默认的内边距去掉 */
            margin:'0'
        };
        return(
            <li style={(this.props.begin=="true") ? divStyle : divStyleNo}>{this.props.value}</li>
            );
    }
});
var Sentence = React.createClass({
    getInitialState: function() {
        return {run: false};
    },
    handleStop: function(time) {

        var self=this;
        setTimeout(function(){
            self.setState({run: false});
        },time);

    },
    handleClick: function(event) {
        this.setState({run: !this.state.run});
        if(!this.state.run){
            this.handleStop(this.props.endTime);
        }
    },
    componentDidMount: function() {
        this.loadFromServer();
//        setInterval(this.loadFromServer, 0);
    },
    loadFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var text = this.state.run ? 'true' : 'false';
        if(this.state.data){
            var commentNodes = this.state.data.map(function (comment) {
                return (
                    <Word key={comment.key} value={comment.value} begin={text} time={comment.time} delay={comment.delay} width={comment.width} height={comment.height} x={comment.x} y={comment.y}/>
                    );
            });

            return (
                <div id="sentence" >
                    <div className="content" onClick={this.handleClick}>
                            {commentNodes}
                        </div>
                </div>
                );
        }
        else{
            return (
                <div id="sentence" className="container-fluid" onClick={this.handleClick}>

                </div>
                );
        }

    }
});
React.render(
    <Sentence url="words.json" endTime="4330"/>,
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