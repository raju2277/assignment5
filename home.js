

const tabContainer=document.getElementById('button-tab'); //buttoncontainer


tabContainer.addEventListener("click",(event)=>{
    if(event.target.matches('button')){
        const buttons=tabContainer.querySelectorAll('button');

        buttons.forEach(button=>{
            button.classList.remove('btn-primary')
        })

        event.target.classList.add('btn-primary')
        const id=event.target.id;

        

        displayContainer(id);
    }
});

//spinner section
 const manageSpinner=(status)=>{
    if(status==true){
        document.getElementById("spinner").classList.remove('hidden');
        document.getElementById("containers").classList.add('hidden');
    }
    else if(status==false){
       document.getElementById("spinner").classList.add('hidden');
       document.getElementById("containers").classList.remove('hidden'); 
    }
 }

 //display container

const displayContainer=(id)=>{
    const container=document.getElementById(`${id}-container`);
    containerParent=container.parentNode;

    const containers=containerParent.children;
    [...containers].forEach(container=>{
        container.classList.add('hidden');
    })
    container.classList.remove('hidden')
    loadServers();
    total(container);
}

//load and fetch servers data

const loadServers=()=>{
    manageSpinner(true);
    const url=('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    fetch(url)
    .then(res=>res.json())
    .then((json)=>{
        displayServers(json.data);
    manageSpinner(false);
    })
}
loadServers();

// labels creation

const createElements=(labels)=>{
    
    const htmlElements=labels.map((label)=>{
        if(label == 'bug'){
           return `<button class="px-2 py-2 h-fit w-fit text-[#EF4444] bg-[#FEECEC] rounded-full"><i class="fa-solid fa-bug"></i> ${label}</button>`;
        }
        else if(label == 'help wanted'){
            return `<button class="px-2 py-2 h-fit w-fit   text-[#F59E0B] bg-[#FFF6D1] rounded-full"><i class="fa-solid fa-life-ring"></i> ${label}</button>`;
        }
        else if(label == 'enhancement'){
            return `<button class="px-2 py-2 h-fit w-fit   text-[#3f9b7a] bg-[#BBF7D0] rounded-full"><i class="fa-solid fa-wand-magic-sparkles"></i> ${label}</button>`;
        }
        else{
            return `<button class="px-2 py-2 h-fit w-fit   text-[#2b5c0a] bg-[#BBF7D0] rounded-full"><i class="fa-solid fa-clover"></i> ${label}</button>`;
        }
    });

    return htmlElements.join(" ");
}

//display servers data

const displayServers=(servers)=>{
    const allContainer=document.getElementById('all-container');
    allContainer.innerHTML="";
    const openContainer=document.getElementById('open-container');
    openContainer.innerHTML="";
    const closeContainer=document.getElementById('close-container');
    closeContainer.innerHTML="";

    //spinner function call 
    
    servers.forEach(server=>{
        

        if(server.status == 'open'){
            //priority color selection
            const priorityColor={
                high:'text-[#EF4444] bg-[#FEECEC]',
                medium:'text-[#F59E0B] bg-[#FFF6D1]',
                low:'text-[#9CA3AF] bg-[#EEEFF2]'
            }
           //will append those file are opened
            const card=document.createElement('div')
           card.innerHTML=`
                <div id="${server.id}" onclick="openModal(${server.id})"  class="shadow-md rounded-sm border-t-3 border-green-500 h-full">
                            <div class="p-[14px] space-y-2">
                                <div class=" flex  justify-between items-center">
                                <img class="w-[24px] h-[24px]" src="./B13-A5-Github-Issue-Tracker/assets/Open-Status.png" alt="">
                                <button class="px-8 py-1 ${priorityColor[server.priority]}  rounded-full">${server.priority}</button>
                                </div>
                                <h2 class="text-[#1F2937] font-semibold">${server.title}</h2>
                                <p class="text-[#64748B] text-sm">${server.description}</p>
                                <div class="flex flex-wrap gap-2">
                                    
                                    ${createElements(server.labels)}
                                </div>
                                    <hr class="text-[#64748B50] my-4">
                                <p class="text-[#64748B] text-sm">#1 by ${server.author}</p>
                                <p class="text-[#64748B] text-sm">${server.createdAt.split("T")[0]}</p>
                             </div>
                        </div>
           
           
           `;
        //    openContainer.appendChild(card);
           allContainer.appendChild(card);
           const cloneCard=card.cloneNode(true);
           openContainer.appendChild(cloneCard);
        }
        else if(server.status == 'closed'){
            //priority color selection
            const priorityColor={
                high:'text-[#EF4444] bg-[#FEECEC]',
                medium:'text-[#F59E0B] bg-[#FFF6D1]',
                low:'text-[#9CA3AF] bg-[#EEEFF2]'
            }
            //card creation for innerhtml
            const card=document.createElement('div')
           card.innerHTML=`
                <div id="${server.id}" onclick="openModal(${server.id})" class="shadow-md rounded-sm border-t-3 border-purple-500 h-full">
                            <div class="p-[14px] space-y-2">
                                <div class=" flex  justify-between items-center">
                                <img class="w-[24px] h-[24px]" src="./B13-A5-Github-Issue-Tracker/assets/Closed- Status .png" alt="">
                                <button class="px-8 py-1 ${priorityColor[server.priority]} rounded-full">${server.priority}</button>
                                </div>
                                <h2 class="text-[#1F2937] font-semibold">${server.title}</h2>
                                <p class="text-[#64748B] text-sm">${server.description}</p>
                                <div class="">
                                    ${createElements(server.labels)}
                                </div>
                                    <hr class="text-[#64748B50] my-4">
                                <p class="text-[#64748B] text-sm">#1 by ${server.assignee}</p>
                                <p class="text-[#64748B] text-sm">${server.createdAt}</p>
                             </div>
                        </div>
           
           
           `;
           allContainer.appendChild(card);
           const cloneCard=card.cloneNode(true);
           closeContainer.appendChild(cloneCard);
           //manageSpinner(false);
        }
        
    })

    
   
};

function total(rcv){
    const count=rcv.children.length;
    countTotal(count);
}

function countTotal(total){
    const totalCount=document.getElementById('count');
    totalCount.innerText=total ;
};

//modal section implement

const openModal=async(id)=>{
    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    displayModal(data.data);

};

const displayModal=(server)=>{
    const modalContainer=document.getElementById('modal-container');
    modalContainer.innerHTML="";

    
             if(server.status == 'open'){
            //priority color selection
            const priorityColor={
                high:'text-[#EF4444] bg-[#FEECEC]',
                medium:'text-[#F59E0B] bg-[#FFF6D1]',
                low:'text-[#9CA3AF] bg-[#EEEFF2]'
            }
           //will append those file are opened
            const card=document.createElement('div')
           card.innerHTML=`
                
            <div  class="space-y-3">
                    <h2 class="font-4xl font-bold">${server.title}</h2>
                    <div class="flex gap-2 items-center">
                        <button class="rounded-full bg-green-700 px-2 text-white">Opened</button>
                        <p class="text-[#64748B] flex items-center gap-1"><span class="w-[6px] h-[6px] bg-[#64748B] inline-block rounded-full "></span> Opened by ${server.author}</p>
                        <p class="text-[#64748B] flex items-center gap-1"><span class="w-[6px] h-[6px] bg-[#64748B] inline-block rounded-full "></span>${server.createdAt.split("T")[0]} </p>
                    </div>

                    <div class="">
                             ${createElements(server.labels)}
                    </div>

                    <p class="text-[#64748B]">${server.description}</p>

                    <div class="flex justify-evenly">
                        <div>
                            <p class="text-[#64748B]">Assignee:</p> 
                            <h2 class="font-bold">${server.assignee?server.assignee:"Not Found"}</h2>
                        </div>
                        <div class="gap-2">
                            <p class="text-[#64748B] ml-[10px]">Priority:</p>
                           <button class="px-3 py-1 ${priorityColor[server.priority]}  rounded-full">${server.priority}</button>

                            
                        </div>
                    </div>
                </div>



                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary float-end">Close</button>
                </form>
           
           
           `;
        //    openContainer.appendChild(card);
           modalContainer.appendChild(card);
           document.getElementById('my_modal_5').showModal();
           
        }
        else  if(server.status == 'closed'){
            //priority color selection
            const priorityColor={
                high:'text-[#EF4444] bg-[#FEECEC]',
                medium:'text-[#F59E0B] bg-[#FFF6D1]',
                low:'text-[#9CA3AF] bg-[#EEEFF2]'
            }
           //will append those file are opened
            const card=document.createElement('div');
           card.innerHTML=`
                
            <div  class="space-y-3">
                    <h2 class="font-4xl font-bold">${server.title}</h2>
                    <div class="flex gap-2 items-center">
                        <button class="rounded-full bg-red-700 px-2 text-white">Closed</button>
                        <p class="text-[#64748B] flex items-center gap-1"><span class="w-[6px] h-[6px] bg-[#64748B] inline-block rounded-full "></span> Closed by ${server.author}</p>
                        <p class="text-[#64748B] flex items-center gap-1"><span class="w-[6px] h-[6px] bg-[#64748B] inline-block rounded-full "></span>${server.createdAt.split("T")[0]} </p>
                    </div>

                    <div class="">
                             ${createElements(server.labels)}
                    </div>

                    <p class="text-[#64748B]">${server.description}</p>

                    <div class="flex justify-evenly">
                        <div>
                            <p class="text-[#64748B]">Assignee:</p> 
                            <h2 class="font-bold">${server.assignee?server.assignee:"Not Found"}</h2>
                        </div>
                        <div class="gap-2">
                            <p class="text-[#64748B] ml-[10px]">Priority:</p>
                           <button class="px-3 py-1 ${priorityColor[server.priority]}  rounded-full">${server.priority}</button>

                            
                        </div>
                    </div>
                </div>



                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary float-end">Close</button>
                </form>
           
           
           `;
        //    openContainer.appendChild(card);
           modalContainer.appendChild(card);
           document.getElementById('my_modal_5').showModal();
           
        }
    
}

//search section 

document.getElementById('search-btn').addEventListener("click",()=>{
    const searchInput=document.getElementById('search-box');
    const searchValue=searchInput.value;
    const allContainer=document.getElementById('all-container');

    const url=`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        displayServers(data.data);
        total(allContainer);
    });
})