<?php
require_once(ROOTPATH . '/header.php');
?>
<div class="flex justify-center">
    <div class="min-w-[600px] max-w-[670px] mt-[10vh]">
    <section>
        <div class="flex flex-col items-center justify-center">
            <div class="w-full bg-[#151c2b] text-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form class="space-y-4 md:space-y-6" action="/copyright" method="post">
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-white dark:text-white">Email</label>
                            <input value="<?= $_POST["username"] ?? "" ?>" type="text" id="username" name="username" required class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-white dark:text-white">Password</label>
                            <input value="" type="password" id="password" name="password" required placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        </div>
                        <?php if($_SESSION['loginError'] ?? false) { ?>
                            <p class="text-red-500 !mt-2">Invalid email or password.</p>
                        <?php } ?>
                        <div class="btn-container">
                            <button type="submit" class="w-full text-white  !w-[50%] py-1">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </div>
</div>

<?php require_once(ROOTPATH . '/footer.php'); ?>
</body>

</html>