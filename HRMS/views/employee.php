<?php
$authenticated = $_SESSION['authenticated'] ?? false;
if (!$authenticated) {
    header('Location: /' . PATH . 'login');
}
$hideHeader = true;
require_once(ROOTPATH . '/user-header.php');
?>

<div class="flex flex-col items-center justify-center">
    <div class="w-[80%] mt-[8vh]">
        <!-- Content goes here -->
        <div class="dashboard-tables  bg-[#151c2b] text-white rounded overflow-y-auto h-[85vh] min-h-[50vh]">
            <div class="relative overflow-x-auto shadow-md w-full m-auto">
                <table class="w-full text-sm text-left  text-white">
                    <thead class="text-xl text-gray-700 uppercase  text-white">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Department
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Last Updated
                            </th>
                        </tr>
                    </thead>
                    <tbody class="employe-table-body">

                    </tbody>
                </table>
            </div>
        </div>
        <div class="dashboard-tables hidden flex items-center justify-center text-2xl bg-[#151c2b] text-white rounded !overflow-hidden h-[70vh] min-h-[70vh]">
            Fetching Training data
        </div>
        <div class="dashboard-tables hidden flex items-center justify-center text-2xl bg-[#151c2b] text-white rounded !overflow-hidden h-[70vh] min-h-[70vh]">
            Fetching Profile data
        </div>
        <div>
        </div>
    </div>
</div>

<script src="./assets/details.js"></script>
</body>

</html>