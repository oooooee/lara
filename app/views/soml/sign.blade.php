@include('soml.header')
<div id="Wrapper">
    <div class="content">

        <div id="Leftbar"></div>
        <div id="Rightbar">
            <div class="sep20"></div>


            <div class="box">
                <div class="cell">
                    <strong>SOML = style of my life</strong>
                    <div class="sep5"></div>
                    <span class="fade">SOML 是一个关于分享和探索的地方</span>
                </div>
                <div class="inner">
                    <div class="sep5"></div>
                    <div align="center"><a href="/sign" class="super normal button">现在注册</a>
                        <div class="sep5"></div>
                        <div class="sep10"></div>
                        已注册用户请 &nbsp;<a href="/login">登录</a></div>
                </div>
            </div>

        </div>
        <div id="Main">
            <div class="sep20"></div>

            <div class="box">
                <div class="header"><a href="/">V2EX</a> <span class="chevron">&nbsp;›&nbsp;</span> 注册</div>

                <div class="inner">
                    <form method="post" action="/signup">
                        <table cellpadding="5" cellspacing="0" border="0" width="100%">
                            <tbody><tr>
                                <td width="120" align="right" valign="top"><div class="sep5"></div>用户名</td>
                                <td width="auto" align="left"><input type="text" class="sl" name="username" value=""><div class="sep5"></div><span class="fade">请使用半角的 a-z 或数字 0-9</span></td>
                            </tr>
                            <tr>
                                <td width="120" align="right">密码</td>
                                <td width="auto" align="left"><input type="password" class="sl" name="password" value=""></td>
                            </tr>
                            <tr>
                                <td width="120" align="right" valign="top"><div class="sep5"></div>电子邮件</td>
                                <td width="auto" align="left"><input type="text" class="sl" name="email" value=""><div class="sep5"></div><span class="fade">请使用真实电子邮箱注册，我们不会将你的邮箱地址分享给任何人</span></td>
                            </tr>

                            <tr>
                                <td width="120" align="right"></td>
                                <td width="auto" align="left"><input type="submit" class="super normal button" value="注册"></td>
                            </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>

        </div>


    </div>
    <div class="c"></div>
    <div class="sep20"></div>
</div>
@include('soml.footer')