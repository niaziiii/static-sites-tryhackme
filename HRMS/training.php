<?php
require_once("constant.php");
$url = isset($_GET['url']) ? $_GET['url'] : '';
?>
<?php
$headerKey = "training";
require_once(ROOTPATH . "/user-header.php");
?>

<div class="min-h-[65vh] flex justify-center pb-0">
    <div class="w-[80%] mt-[5vh] flex items-center justify-center">
        <!-- Content goes here -->
        <div class="text-white flex items-center justify-center !overflow-hidden m-auto">
            <?php
            $address =  htmlspecialchars($url);
            ?>

            <div id="remote-content" class="p-8 rounded-2xl bg-[#151c2b] text-2xl">
            </div>
        </div>
    </div>
</div>
<?php require_once(ROOTPATH . "/footer.php"); ?>

</body>

<script>
    // send AJAX request
    document.addEventListener('DOMContentLoaded', function() {
        var urlParam = new URLSearchParams(window.location.search).get('url');
        let contentContainer = document.getElementById("remote-content");
        contentContainer.innerHTML = "loading..."

        const url = `http://${urlParam}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Display the received data
                contentContainer.innerHTML = data.response;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
</script>

</html>