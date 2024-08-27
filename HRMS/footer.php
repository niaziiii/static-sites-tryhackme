<footer class="mt-14 px-4 py-4 pb-4 bg-[#151c2b] text-white">

    <div class="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-0 w-[98%] m-auto">
        <div class="flex flex-col gap-3">
            <div class="w-fit ml-8 md:ml-0 md:!m-auto">
                <div>
                    <img src="/assets/logo-white.png" alt="image-logo" class="h-16" />
                </div>
                <div class="text-white rounded">
                    <?php
                    $uri = rtrim($_SERVER['REQUEST_URI'], "/");
                    $file = "$uri.php";
                    $path = ROOTPATH . $file;

                    if (file_exists($path)) {
                        echo "<pre>";
                        echo htmlspecialchars(file_get_contents($path));
                        echo "</pre>";
                    } else { ?>
                        <p class="text-xl"><?= ltrim($file, "/") ?> is not found</p>
                    <?php 
                    }
                    ?>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="w-[10rem]">
                <ul class="flex flex-col gap-2">
                    <b class="text-xl">CRM</b>
                    <li>Employe Management</li>
                    <li>Training</li>
                    <li>Profile Building</li>
                    <li class="flex items-center gap-4 text-2xl">
                        <i class="fa-brands fa-facebook"></i>
                        <i class="fa-brands fa-x-twitter"></i>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex justify-start md:justify-center">
            <div class="w-[10rem] ml-8 md:ml-0">
                <ul class="flex flex-col gap-2">
                    <b class="text-xl">Resources</b>
                    <li>Plans & Pricing</li>
                    <li>Help Center</li>
                    <li>Blog</li>
                </ul>
            </div>
        </div>
    </div>
</footer>