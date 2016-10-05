<template>
    <ul class="dropdown-menu">
        <!-- User image -->
        <li class="user-header">
            <img src="../../../assets/image/user2-160x160.jpg" class="img-circle" alt="User Image">

            <p>
                Alexander Pierce - Web Developer
                <small>Member since Nov. 2012</small>
            </p>
        </li>
        <!-- Menu Body -->
        <li class="user-body">
            <div class="row">
                <div class="col-xs-4 text-center">
                    <a href="#">Followers</a>
                </div>
                <div class="col-xs-4 text-center">
                    <a href="#">Sales</a>
                </div>
                <div class="col-xs-4 text-center">
                    <a href="#">Friends</a>
                </div>
            </div>
            <!-- /.row -->
        </li>
        <!-- Menu Footer-->
        <li class="user-footer">
            <div class="pull-left">
                <a href="#" class="btn btn-default btn-flat">個人資料</a>
            </div>
            <div class="pull-right">
                <a class="btn btn-default btn-flat" @click="logout">登出</a>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['logout']
}
</script>
