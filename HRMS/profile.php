<?php
require_once("constant.php");
?>

<?php
$headerKey = "profile";
require_once(ROOTPATH . "/user-header.php");
?>

<div class="min-h-[50vh] flex justify-center pb-10">
    <div class="w-[80%] mt-[10vh]">
        <!-- Content goes here -->
        <div class="bg-white text-white rounded flex items-center justify-center overflow-hidden h-[50vh] min-h-[50vh]">
            <div class="p-8 rounded-2xl bg-[#151c2b]">
                <h1 class="text-3xl message"></h1>
            </div>
            <script>
                document.addEventListener('DOMContentLoaded', function() {
                    var urlParam = new URLSearchParams(window.location.search).get('url');
                    let message = document.querySelector(".message");

                    const url = urlParam.startsWith("http") ? urlParam : `http://${urlParam}`;

                    fetch(url)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response;
                        })
                        .then(data => {
                            console.log(data);
                            // Display the received data
                            message.innerHTML = data;
                        })
                        .catch(error => {
                            console.log(error)
                            console.error('Error:', error);
                        });
                    
                     message.innerHTML = "Loading ..."
                });
            </script>

        </div>
    </div>
</div>
<?php require_once(ROOTPATH . "/footer.php"); ?>

</body>

</html>