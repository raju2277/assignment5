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
    const url=('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    fetch(url)
    .then(res=>res.json())
    .then((json)=>displayServers(json.data));
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
                <div id="${server.id}" onclick="my_modal_5.showModal();openModal(${server.id});"  class="shadow-md rounded-sm border-t-3 border-green-500 h-full">
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
                <div onclick="my_modal_5.showModal()" class="shadow-md rounded-sm border-t-3 border-purple-500 h-full">
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
    console.log(data.data);

}